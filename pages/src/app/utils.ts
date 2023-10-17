import _flattenDeep from 'lodash/flatMapDeep'

interface TraverseCompModel {
  def: {
    namespace: string,
    version: string
  },
  model: {
    css: any,
    spm: any,
    data: any
  }
}

export function traverseAllComponents (slots): TraverseCompModel[] {
  return _flattenDeep(slots.map(({ comAry }) => {
    if (Array.isArray(comAry)) {
      return comAry.map((com) => {
        const { slots } = com
        if (Array.isArray(slots)) {
          return [com, ..._flattenDeep(traverseAllComponents(slots))]
        }

        return [com]
      })
    }

    return []
  }))
}