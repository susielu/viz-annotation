var AnnotationCollection = (function () {
    function AnnotationCollection(_a) {
        var annotations = _a.annotations, accessors = _a.accessors;
        this.annotations = annotations;
        this.accessors = accessors;
    }
    Object.defineProperty(AnnotationCollection.prototype, "json", {
        get: function () {
            return this.annotations.map(function (a) { return a.json; });
        },
        enumerable: true,
        configurable: true
    });
    return AnnotationCollection;
}());
export default AnnotationCollection;
