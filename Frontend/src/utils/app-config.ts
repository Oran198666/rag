class AppConfig {
	private readonly baseUrl = "http://localhost:4000/api/";

	public readonly indexUrl = this.baseUrl + "index";
	public readonly searchUrl = this.baseUrl + "search";
	public readonly askUrl = this.baseUrl + "ask";
}

export const appConfig = new AppConfig();