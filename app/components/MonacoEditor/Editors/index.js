import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import config from 'config'
import CodeEditor from './CodeEditor'
import MarkDownEditor from './MarkDownEditor'
import UnknownEditor from 'components/Editor/components/UnknownEditor'
import ImageEditor from 'components/Editor/components/ImageEditor'

const EditorWrapper = observer(({ tab, active }) => {
  // if (!active) return null

  const { editor, editorInfo } = tab
  const editorType = editor.editorType || 'default'
  const file = editor.file || {}
  // key is crutial here, it decides whether
  // the component should re-construct or
  // keep using the existing instance.
  const key = `editor_${file.path}`
  switch (editorType) {
    case 'htmlEditor':
      return React.createElement(CodeEditor, { editor, editorInfo, key, tab, active, language: '' })
    case 'default':
      return React.createElement(CodeEditor, { editor, editorInfo, key, tab, active, language: config.mainLanguage })
    case 'editorWithPreview':
      return React.createElement(MarkDownEditor, { editor, editorInfo, key, tab, active, language: config.mainLanguage })
    case 'imageEditor':
      return React.createElement(ImageEditor, { path: file.path, key, tab, active })
    default:
      return React.createElement(UnknownEditor, { path: file.path, size: file.size, key, tab, active })
  }
})

EditorWrapper.propTypes = {
  tab: PropTypes.object
}

EditorWrapper.contextTypes = {
  i18n: PropTypes.func
}

export default EditorWrapper

export {
  CodeEditor,
}
