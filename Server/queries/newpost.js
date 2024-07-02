export const addpost="INSERT INTO blogpost (postid, title, category, collab, status, text_content, image) values ($1, $2, $3, $4, $5, $6, $7)";

export const getposts="select * from blogpost;"

export const deletepostwitid="DELETE from blogpost where postid=$1;";