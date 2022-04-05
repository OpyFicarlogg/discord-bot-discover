In the folder Impl, all .ts file  must implements the Command interface, becauses all files in this folder are imported dynamically.

When imported, class of the files is parsed in Command type, so it will throw an error. 

