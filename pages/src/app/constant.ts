export const CodeTemplate = {
  Track: {
    Initial: {
      Default: `<script src="埋点SDK JS地址"></script>
<script>
// SDK 初始化js逻辑
</script>
`,
      Comment: `<script src="埋点SDK JS地址"></script>
<script>
// SDK 初始化js逻辑
</script>
`,
    },
    Com: {
      Comment: `/**
* @param common 公共参数，比如搭建时声明的title
* @param extra 额外参数，包含代码传入的额外参数以及搭建时补充的业务参数
* @description 书写同一类型的组件使用什么方式上报
**/
(common, extra) => {
  // 假设使用aplus上报
  aplus.record('BUTTON', {
    title: common.title,
  })
}       
      `
    }
  }
}

export const EditorsCdnOptions = {
  expression: {
    CDN: {
      codemirror: '/mfs/editor_assets/codemirror/codemirror_1.0.13_index.min.js'
    }
  },
  richtext: {
    CDN: {
      tinymce: '/mfs/editor_assets/richText/tinymce/5.7.1/tinymce.min.js',
      language: '/mfs/editor_assets/richText/tinymce/5.7.1/zh_CN.js',
    }
  },
  align: {
    CDN: {
      left: '/mfs/editor_assets/align/left.defc4a63ebe8ea7d.svg',
      rowCenter: '/mfs/editor_assets/align/center.c284343a9ff9672a.svg',
      right: '/mfs/editor_assets/align/right.a7763b38b84b5894.svg',
      top: '/mfs/editor_assets/align/top.98906024d52b69de.svg',
      columnCenter: '/mfs/editor_assets/align/center.100376f4ade480cd.svg',
      bottom: '/mfs/editor_assets/align/bottom.6ee532067ed440ca.svg',
      column: '/mfs/editor_assets/align/column-space-between.31d560c0e611198f.svg',
      row: '/mfs/editor_assets/align/row-space-between.ead5cd660c0f1c33.svg',
    }
  },
  array: {
    CDN: {
      sortableHoc: '/mfs/editor_assets/react-sortable/react-sortable-hoc-2.0.0_index.umd.min.js'
    }
  },
  expcode: {
    CDN: {
      prettier: {
        standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
        babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
      },
      eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
    }
  },
  csseditor: {
    CDN: {
      prettier: {
        standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
        babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
      },
      eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
    }
  },
  stylenew: {
    CDN: {
      prettier: {
        standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
        babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
      },
      eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
    }
  },
  code: {
    CDN: {
      prettier: {
        standalone: '/mfs/editor_assets/prettier/2.6.2/standalone.js',
        babel: '/mfs/editor_assets/prettier/2.6.2/parser-babel.js'
      },
      eslint: '/mfs/editor_assets/eslint/8.15.0/eslint.js',
      paths: {
        vs: "/mfs/editor_assets/monaco-editor/0.33.0/min/vs",
      },
      monacoLoader: '/mfs/editor_assets/monaco-editor/0.33.0/min/vs/loader.min.js'
    }
  }
}