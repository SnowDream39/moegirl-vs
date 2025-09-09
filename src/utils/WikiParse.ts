export type TemplateData = { [key: string]: string }
export type Template = {
  name: string
  data: TemplateData
}

/**
 * 计算字符串的显示宽度
 * @param str 输入字符串
 * @returns
 */
function getStringWidth(str: string) {
  let width = 0
  for (const char of str) {
    // 如果是 ASCII 半角字符，宽度算 1
    if (char.charCodeAt(0) <= 0xff) {
      width += 1
    } else {
      // 非 ASCII 字符（全角、中文、日文等）宽度算 2
      width += 2
    }
  }
  return width
}

/**
 * 解析单个模板字符串
 */
export function parseTemplate(text: string): Template | null {
  if (!text.startsWith('{{') || !text.endsWith('}}')) return null
  const inner = text.slice(2, -2).trim()

  const parts: string[] = []
  let buffer = ''
  let depthBraces = 0
  let depthBrackets = 0

  for (let i = 0; i < inner.length; i++) {
    const c = inner[i]
    const next2 = inner.slice(i, i + 2)

    if (next2 === '{{') {
      depthBraces++
      buffer += next2
      i++
      continue
    }
    if (next2 === '}}' && depthBraces > 0) {
      depthBraces--
      buffer += next2
      i++
      continue
    }
    if (next2 === '[[') {
      depthBrackets++
      buffer += next2
      i++
      continue
    }
    if (next2 === ']]' && depthBrackets > 0) {
      depthBrackets--
      buffer += next2
      i++
      continue
    }

    if (c === '|' && depthBraces === 0 && depthBrackets === 0) {
      parts.push(buffer.trim())
      buffer = ''
    } else {
      buffer += c
    }
  }
  if (buffer) parts.push(buffer.trim())

  const name = parts[0]
  const data: TemplateData = {}
  for (let i = 1; i < parts.length; i++) {
    const p = parts[i]
    const eqIndex = p.indexOf('=')
    if (eqIndex !== -1) {
      const key = p.slice(0, eqIndex).trim()
      const val = p.slice(eqIndex + 1).trim()
      data[key] = val
    } else {
      data[i] = p
    }
  }

  return { name, data }
}

/**
 * 根据 Template 对象生成模板字符串
 */
export function buildTemplateString(tpl: Template): string {
  const widths = Object.entries(tpl.data).map(([k, v]) => getStringWidth(k))
  const maxKeyWidth = Math.max(...widths, 0)
  const params = Object.entries(tpl.data).map(([k, v]) =>
    /^\d+$/.test(k) ? v : `${k}${' '.repeat(maxKeyWidth - getStringWidth(k))} = ${v}\n`,
  )
  return `{{${tpl.name}\n${params.length ? '|' + params.join('|') : ''}}}`
}

/**
 * 在文本中查找指定模板并修改
 * @param text 文本
 * @param targetNames 要修改的模板名字列表
 * @param modifyFn 回调函数，用于修改模板
 */
export function modifyTemplates(
  text: string,
  targetNames: string[],
  modifyFn: (tpl: Template) => Template,
): string {
  const regex = /\{\{([^{}]|\{\{[^}]+\}\})+\}\}/g
  let resultText = ''
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const tpl = parseTemplate(match[0])
    if (tpl && targetNames.includes(tpl.name)) {
      const newTpl = modifyFn({ ...tpl })
      resultText += text.slice(lastIndex, match.index)
      resultText += buildTemplateString(newTpl)
      lastIndex = match.index + match[0].length
    }
  }

  resultText += text.slice(lastIndex)
  return resultText
}
