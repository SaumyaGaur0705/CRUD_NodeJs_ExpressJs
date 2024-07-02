

export const adduser= "INSERT INTO auth (firstname, lastname, email, password) VALUES ($1,$2,$3,$4);";

export const checkemailexists="Select * from auth where email=$1;";

export const username="Select firstname,lastname from auth;";