export const usersQuerysString = {
    createTableUsers: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(10),
        key VARCHAR(100),
        dateCreate VARCHAR(12),
        state CHAR(1)
      );`,
    insertTableUsers:"INSERT INTO users (username, key, dateCreate, state) VALUES (?, ?, ?, ?)",
    selectTableUsersActives: "SELECT * FROM users WHERE username = ? AND state = ? ",
    selectTableUsersPaginated: "SELECT * FROM users WHERE state = ? LIMIT ? OFFSET ?",
    selectTableUsersById: "SELECT * FROM users WHERE id = ?",
    updateTableUsers: "UPDATE users SET username = ?, key = ?, state = ? WHERE id = ?",
    deleteUserById: "DELETE FROM users WHERE id = ?"
}