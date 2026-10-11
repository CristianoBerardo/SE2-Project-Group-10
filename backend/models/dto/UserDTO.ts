/**
 * DTO FOR USER RETRIEVAL
 * Password is not included in the response for security reasons
 */
export interface UserResponseDTO {
    id: string;             // Unique identifier for the user (uuid)
    username: string;       // Unique username for the user
    role: string;           // Role of the user
}

/**
 * DTO FOR USER LOGIN
 */
export interface LoginUserDTO {
    username: string;       // Unique username for the user
    password: string;       // Password for the user
}

/**
 * DTO FOR USER CREATION
 * Password is not included in the response for security reasons
 */
export interface CreateUserDTO {
    username: string;       // Unique username for the user
    password: string;       // Password for the user
    role?: string;          // Optional role of the user, defaults to "GUEST"
}