export type AuthRoles = "user" | "admin" | "organiser" | "moderator"

export type AuthRoleTypes = {
    roleTypes: AuthRoles
}

export type AuthAttributes =  { // Authentication Atributes
    email: string;
    password: string;
    username: string;
    passwordConfirm: string
}

export type AuthMeta = { // Authentication Meta Data is an array of auth attributes
    authAttributes: AuthAttributes[]
}

export type Auth = {
    meta: AuthMeta
} & AuthAttributes