import { h, Fragment } from 'vue'
import CodeSnippet from '~/components/CodeSnippet.vue'

export const useTextFormatter = () => {
  const formatTextWithCode = (text) => {
    if (!text) return []
    
    // Replace <<<CODE>>> with <code> and <<<ENDCODE>>> with </code>
    const parts = text.split(/(<<<CODE>>>|<<<ENDCODE>>>)/g)
    
    const components = []
    let inCode = false
    let codeBuffer = ''
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      
      if (part === '<<<CODE>>>') {
        inCode = true
        continue
      } else if (part === '<<<ENDCODE>>>') {
        if (inCode && codeBuffer) {
          components.push(h(CodeSnippet, {}, codeBuffer))
          codeBuffer = ''
        }
        inCode = false
        continue
      }
      
      if (inCode) {
        codeBuffer += part
      } else if (part) {
        components.push(part)
      }
    }
    
    // Handle any remaining code if the closing tag is missing
    if (inCode && codeBuffer) {
      components.push(h(CodeSnippet, {}, codeBuffer))
    }
    
    return components
  }
  
  return {
    formatTextWithCode
  }
}