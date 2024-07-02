export const getusers="SELECT * FROM crudusers ORDER BY id;";

export const getusersid="Select * FROM crudusers WHERE id=$1;";

export const checkemailexists="Select * from crudusers where email=$1;";

export const adduser="Insert into crudusers (id,name,email,contact) values ($1,$2,$3,$4);";

export const deleteuser="DELETE from crudusers where id=$1;";

export const updateuser="UPDATE crudusers SET name = $2,email=$3,contact=$4 WHERE id =$1;";

export const userfindid="Select id,firstname,lastname,email,followers,following,bio from auth where id=$1;";

export const addfollowing=""