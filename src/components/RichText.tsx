import React from 'react'

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: LexicalNode[]
}

type Props = {
  content: Record<string, unknown> | null | undefined
  className?: string
}

function serializeNode(node: LexicalNode, key: number): React.ReactNode {
  if (node.type === 'text') {
    let text: React.ReactNode = node.text ?? ''
    const fmt = node.format ?? 0
    if (fmt & 1) text = <strong key={`b-${key}`}>{text}</strong>
    if (fmt & 2) text = <em key={`i-${key}`}>{text}</em>
    if (fmt & 8) text = <u key={`u-${key}`}>{text}</u>
    return text
  }

  const children = node.children?.map((child, i) =>
    <React.Fragment key={i}>{serializeNode(child, i)}</React.Fragment>
  )

  switch (node.type) {
    case 'paragraph':
      return <p key={key} className="mb-4 leading-relaxed">{children}</p>
    case 'heading':
      if (node.tag === 'h1') return <h1 key={key} className="font-bold text-navy mt-6 mb-3 text-2xl">{children}</h1>
      if (node.tag === 'h2') return <h2 key={key} className="font-bold text-navy mt-6 mb-3 text-xl">{children}</h2>
      if (node.tag === 'h3') return <h3 key={key} className="font-semibold text-navy mt-5 mb-2 text-lg">{children}</h3>
      return <p key={key}>{children}</p>
    case 'list':
      if (node.listType === 'bullet')
        return <ul key={key} className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
      return <ol key={key} className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'linebreak':
      return <br key={key} />
    default:
      return <React.Fragment key={key}>{children}</React.Fragment>
  }
}

export default function RichText({ content, className }: Props) {
  if (!content || !content.root) return null
  const root = content.root as LexicalNode
  if (!root.children) return null

  return (
    <div className={className}>
      {root.children.map((node, i) => serializeNode(node, i))}
    </div>
  )
}
