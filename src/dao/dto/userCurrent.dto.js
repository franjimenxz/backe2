export default class UserCurrentDTO {
  constructor(user) {
    this.full_name = user.first_name + " " + user.last_name;
    this.email = user.email || "Sin email";
    this.age = user.age;
    this.role = user.role;
  }
}
