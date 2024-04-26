export interface ILiteLoaderManifestConfig {
  manifest_version: 4;

  type?: 'extension' | 'theme' | 'framework';

  name: string;

  slug: string;

  description: string;

  version: string;

  icon?: string | null;

  thumb?: string | null;

  authors: ILiteLoaderManifestAuthorsConfig[];

  dependencies?: string[];

  platform: [
    "win32"?,
    "linux"?,
    "darwin"?,
  ];

  injects: {
    main?: string;

    preload?: string;

    renderer?: string;
  };

  repository?: {
    repo: string;

    branch: string;

    release?: {
      tag: string;

      file?: string;
    }
  };
};

export interface ILiteLoaderManifestAuthorsConfig {
  name: string;

  link: string;
};