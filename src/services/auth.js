import bcrypt from "bcryptjs";

export const createPasswordHash = async (password) => {
    return bcrypt.hash(password, 8);
}

export const checkPassword = async (user, password) => {
    const compare = await bcrypt.compare(password, user.password_hash);
    console.log(compare);
    return compare;
}

export const hasAdminPermission= (currentUser) => {
    return currentUser && currentUser.roles === "admin";
}

export const hasManagerPermission= (currentUser) => {
    return currentUser && ["admin", "manager"].includes(currentUser.roles);
}