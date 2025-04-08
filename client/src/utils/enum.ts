export const checkRole = (role: string) => {
    switch (role) {
        case "admin":
            return "Admin";
        case "student":
            return "Học sinh";
        case "teacher":
            return "Giáo viên";
        default:
            return "";
    }
}