
class GitHubDto {

  private username: string = '';
  private password: string = '';
  private url: string = '';
  private description: string = '';

  getUsername = () => {
    return this.username;
  }

  setUsername = (val) => {
    this.username = val
  }

  getPassword = () => {
    return this.password;
  }

  setPassword = (val) => {
    this.password = val
  }

  getUrl = () => {
    return this.url;
  }

  setUrl = (val) => {
    this.url = val
  }

  getDescription = () => {
    return this.description;
  }

  setDescription = (val) => {
    this.description = val
  }

}

export default GitHubDto;
