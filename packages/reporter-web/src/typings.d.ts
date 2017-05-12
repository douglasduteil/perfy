/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  requestIdleCallback(callback: () => void): number;
}

interface Window {
  Plotly: any;
}
