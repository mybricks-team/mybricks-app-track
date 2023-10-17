import API from '@mybricks/sdk-for-app/api'
import ThemeEditor from './theme'
import TrackPlanEditor from './track-plan'
import TrackEditor from './track'
import TrackCode from './coder'

export default ({ editConfig, designerRef }, { fileId }) => {
  if (editConfig && !editConfig.upload) {
    editConfig.upload = async (files: Array<File>): Promise<Array<string>> => {
      const content = files[0]
      
      const res = await API.Upload.staticServer({
        content,
        folderPath: `/files/${fileId}`,
        noHash: false,
        fileName: content.name
      }) as { url: string }

      return [res.url]
    }
  }

  const editorsMap = {
    THEME: ThemeEditor,
    TRACK: TrackEditor,
    TRACKPLAN: TrackPlanEditor,
    TRACKCODE: TrackCode,
  }

  let editor
  try {
    editor = editorsMap[editConfig.type.toUpperCase()] || editConfig.render
  } catch (err) {
    console.error(err)
  }

  const editorType = typeof editor

  if (editorType === 'function') {
    return editor({ editConfig, designer: designerRef.current })
  }

  if (editConfig === 'object' && typeof editor.render === 'function') {
    return editor
  }

  return
}
