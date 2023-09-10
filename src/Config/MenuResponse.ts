type AboutDomain =
  | {
      hasDomain: true;
      definedDomain: string;
    }
  | {
      hasDomain: false;
    };

type SetDomainResult =
  | {
      isSuccessed: false;
      message: string;
    }
  | {
      isSuccessed: true;
      message: string;
      domain: string;
    };

export type { AboutDomain, SetDomainResult };
