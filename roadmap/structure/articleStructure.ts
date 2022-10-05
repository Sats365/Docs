type FileUrl = string; // ссылка на файл. Может быть как внутри каталога, так и к внешнему ресурсу
type ShortHref = string; // AlphaNum -- буквы/цифры/underscore
type SimpleText = string; // простой текст, возможно разрешим что-то из спецэлементов
type Icon = string; // можно будет сюда добавить enum по всем иконкам

interface DocumentProperties {
	title: SimpleText;
	description: ParagraphBlock[];
}

interface Document {
	properties: DocumentProperties;
	content: Chapter[]; // есть как минимум одна глава уровня 2, по смыслу означает "Введение"
}

type HeadingLevel = 2 | 3 | 4 | 5 | 6; // первого уровня быть не может

interface Chapter {
	title: SimpleText;
	level: HeadingLevel; // может убрать чтобы вычислялся?, но тогда непонятно что будет с обратной совместимостью
	shortHref: ShortHref;
	blocksOrChapters: Block[] | Chapter[];
}

interface Block {} // блочный элемент, без глав
interface Inline {} // инлайновый элемент

interface ParagraphBlock extends Block {
	_content: InlineContent;
}

interface ImageBlock extends Block {
	imageUrl: FileUrl;
	description: SimpleText;
}

interface ImageInline extends Inline {
	imageUrl: FileUrl;
}

interface TableBlock extends Block {
	cells: Block[][];
	caption: SimpleText;
}

interface ListBlock extends Block {
	blocks: Block[];
}

interface MenuItemInline extends Inline {
	icon: Icon;
	_content: SimpleText;
}

interface AdmonitionBlock extends Block {
	type: "note" | "danger";
	title: SimpleText;
	blocks: Block[];
}

type CodeLanguage = "js" | "yaml";
interface CodeBlock extends Block {
	language: CodeLanguage;
	_content: SimpleText;
}

interface CodeInline extends Inline {
	_content: SimpleText;
}

// может быть много типов ссылок, не стал детализировать
type LinkUrl = { url: string; type: "doc" | "external" };

type InlineContent = Inline;

interface LinkInline extends Inline {
	_content: InlineContent;
	url: LinkUrl;
}

interface BoldItalicInline extends Inline {
	_content: InlineContent;
	type: "bold" | "italic" | "bold+italic";
}

interface SpecialInline extends Inline {
	type: ""; // мелкие элементы на которые неохота делать отдельный класс, но которые хотелось бы чтобы вели себя понятным образом
}

// alfa и module -- могут быть частью SimpleText? Что еще?
