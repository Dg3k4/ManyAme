module.exports = class UserDto {
    email;
    id;
    name;
    roleIds;
    isActive;

    constructor(model) {
        this.email = model.email
        this.id = model.id
        this.name = model.name
        this.roleIds = model.roleIds
        this.isActive = model.isActive
    }
}