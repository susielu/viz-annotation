import Annotation from './Annotation'

export default class AnnotationCollection {
  annotations: Array<Annotation>
  accessors: Object

  constructor({ annotations, accessors }) {
    this.annotations = annotations
    this.accessors = accessors
  }

  get json() {
    return this.annotations.map(a => a.json)
  }
}
