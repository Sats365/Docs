// поток байтов, Buffer
type Stream = any[]; 
type DomElement = "DomEl";
type FileLocation = "FileLoc";

interface DocumentFileFormatter {
    serialize(file: Document): Stream;
    deserialize(stream: Stream): Document
}

interface MarkdownFormatter extends DocumentFileFormatter {
}

interface YamlSimpleFormatter extends DocumentFileFormatter {
}

interface Renderer {
    render(file: Document): void;
    parse(el: DomElement): Block[]|Inline[];
}

class ReactRenderer implements Renderer {
    new(el: DomElement) {}
    render() {}
}

interface Location {
}

interface Storage {
    save(stream: Stream, location: FileLocation): void;
    read(location: FileLocation): Stream;
}