interface DocReader {
	catalogs: Catalog[];
}

interface Catalog {
	articles: Article[];
}

interface Article {
	title: string;
	content: string;
}
