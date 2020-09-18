
const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorect form submission');
    }
    // the above if statement does security validation

    const hash = bcrypt.hashSync(password);
   

// bcrypt.hash(password, null, null, function(err, hash) {
//     console.log(hash);
// });
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
        .returning('*')
        .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
        })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))
    // res.json(database.users[database.users.length-1])
    // database.users.length-1 grabs the last user of the array (newly created user)
}

module.exports = {
    handleRegister: handleRegister
}

// the handleRegister function is stated in module exports in which we want to export