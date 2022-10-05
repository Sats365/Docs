// базовые свойства
type Url = string;


type StorageItemRef = {};
type StorageItemContent = {};

type ItemChange = {
    itemRef: StorageItemRef;
    getPreviousContent(): StorageItemContent;
    getCurrentContent(): StorageItemContent
}

type Version = {
    getChanges(): ItemChange[]
}

type CommitRef = string; // sha
type BranchRef = string;

type Commit = {
    ref: CommitRef;
    getChangeset(): Version
}

type Branch = {
    ref: BranchRef; 
    getCommits(top: number): Commit[];
}

interface BranchedStorage {
    getBranches(): Branch[]
    getCurrentBranch(): Branch;
    switchBranch(branch: Branch): void;
    compareBranch(otherBranch: Branch): Version;
}

interface Storage {
    getItem(itemRef: StorageItemRef): StorageItem;
    getBranchedStorage(): BranchedStorage; // google drive не реализует
}

interface StorageItem {
    getVersionedItem(): VersionedItem; // не null только для тех кто управляет на уровне отдельных файлов
}

type VersionedItem = {
    getVersions(): Version[];
}


function renderNavigation(catalog: CatalogPresenter) {

    catalog.getNav()
        .getNodes()
        .filter(x => !collapsed.find(x.itemRef))
        .map(x => {

            return { itemRef: x.itemRef, title: x.title(), };
        })
    
}

interface StorageConnection<StorageRef> {
    getStorage(storageRef: StorageRef): Storage;
}

// SNIPPET: Клонирование репозитория
// Gitlab
interface GitConnection extends StorageConnection<{ repositoryUrl: Url; folderName: string; }> {}
let gitlabConnection: GitConnection;
let storage = gitlabConnection.getStorage({ folderName: "someCatalog", repositoryUrl: "git@xxxx" });

// Google Drive
interface GoogleDriveConnection extends StorageConnection<{ folderRef: string }> {}
let googleDriveConnection: GoogleDriveConnection;
storage = googleDriveConnection.getStorage({ folderRef: "safqeqjkcfa" })


// SNIPPET: По itemRef получить историю изменений
let storageItemRef: StorageItemRef;
let itemVersions = storage.getItem(storageItemRef).getVersionedItem().getVersions();
let change = itemVersions[0].getChanges()[0];

// // 
// метаинформация
//     docroot
//     frontmattier
//     автор документа?

// кто знает о doc-root.yaml ??
//     метаинформация по каталогу
//     кто превращает 

// у статьи есть метаинформация. По ней можно фильтровать секьюрити
// каталог
//     getNav(
//         артиклов 
//         секьюрити
//     )

//     докрут.ямл реф

//     из другого репозитория подтягивать другой проект - по сути в навигации
