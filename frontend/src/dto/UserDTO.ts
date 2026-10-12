export interface UserLoginDTO {
    username: string;
    password: string;
}

export interface UserDTONoPassword {
    username: string;
    password: string;
    role: string;
}

export interface UserLoginResponseDTO {
    message: string;
    token: string;
    user: UserDTONoPassword;
}