const isEmpty = (string) => {
    if (string === null || string.trim() === '') return true;
    else return false;
}
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

exports.validateSignupData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = 'must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'must be an valid email address';
    }
    if (isEmpty(data.password)) errors.password = 'must not be empty';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'passwords doesnot match';
    if (isEmpty(data.handle)) errors.handle = 'must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}


exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) errors.email = 'must not be empty';
    if (isEmpty(data.password)) errors.password = 'must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}

const isValidLink = (link) => {
    const regEx = "((http|https)://)(www.)?"
    + "[a-zA-Z0-9@:%._\\+~#?&//=]"
    + "{2,256}\\.[a-z]"
    + "{2,6}\\b([-a-zA-Z0-9@:%"
    + "._\\+~#?&//=]*)";
    if(link.match(regEx)) return true;
    else return false;
}

exports.validateAddPostData = (data) => {
    let errors = {};
    if(data.title.length <= 5) errors.title = 'title must be atleast 6 charcters long';
    
    /**
     * The URL must start with either http or https and
     * then followed by :// and 
     * then it must contain www. and 
     * then followed by subdomain of length (2, 256) and 
     * last part contains top level domain like .com, .org etc.
     */
    if(!isValidLink(data.body)) errors.body = "url must be valid";
    if(data.tags.length <= 5 ) errors.tags = "tag must be atleast 6 characters long";
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}