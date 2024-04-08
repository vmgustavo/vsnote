import * as vscode from 'vscode';

export class Config {
  public static context: vscode.ExtensionContext;
  public static extensionConfig: vscode.WorkspaceConfiguration;

  public static init(context: vscode.ExtensionContext) {
    this.context = context;
    this.extensionConfig = vscode.workspace.getConfiguration('vsnote');
  }

  /**
   * Get the extension configuration (exposed in package.json) for the given key
   * @param key
   */
  public static getExtensionConfiguration(key: string) {
    const config = this.extensionConfig.inspect(key);
    return config?.globalValue !== undefined ? config.globalValue : config?.defaultValue;
  }

  /**
   * Set an extension configuration based on the given key and value.
   * The configuration will be saved on the global target.
   * @param key
   * @param value
   */
  public static setExtensionConfiguration(key: string, value: any) {
    this.extensionConfig.update(key, value, true);
  }
}
