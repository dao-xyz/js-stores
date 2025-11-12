declare module 'threads' {
  export type WorkerModule = Record<string, (...args: any[]) => any>

  export type ModuleThread<Methods extends WorkerModule> = {
    [MethodName in keyof Methods]: (
      ...args: Parameters<Methods[MethodName]>
    ) => Promise<Awaited<ReturnType<Methods[MethodName]>>>
  }

  export class Worker {
    constructor(filename: string)
  }

  export function spawn<Methods extends WorkerModule>(worker: Worker): Promise<ModuleThread<Methods>>

  export namespace Thread {
    function terminate<Methods extends WorkerModule>(thread: ModuleThread<Methods>): Promise<void>
  }
}

declare module 'threads/worker' {
  export function expose<Methods extends Record<string, (...args: any[]) => any>>(exposed: Methods): void
}
