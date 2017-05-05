;
/**
 * Created by LaBestia on 05.05.2017.
 */

var NAME_VALIDATE_RULE = /^\w{5,}$/i;
var EMAIL_VALIDATE_RULE = /^\w+@\w+\.\w{2,}$/i;
var PASSWORD_VALIDATE_RULE = /^[aeyuio]{5,}\d{3,}$/i;

var validsStore = {
                    'name_input': false,
                    'email_input': false,
                    'password_input': false,
                    'gender_select':false,
                    'about_textarea':true,
                    'terms': false
                  };

window.onload = function ()
{
    var registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('keyup', inputKeyDownHandler);
    registerForm.addEventListener('click', registerFormClickHandler);

    var genderSelect = document.getElementById('gender_select');
    genderSelect.addEventListener('change', selectChangeHandler);

    var aboutTextarea = document.getElementById('about_textarea');
    aboutTextarea.addEventListener('keydown', textareaKeyDownHandler);

    var termsCheckbox = document.getElementById('terms');
    termsCheckbox.addEventListener('change', termsChangeHandler);

    var registerButton = document.getElementById('register_button');
    registerButton.disabled = true;

    /**
     *
     * @param key
     * @param value
     */
    function setValidsStore(key, value)
    {
        if (validsStore[key] !== value)
        {
            var help = document.getElementById(key + '_help');
            if (help)
            {
                help.classList.toggle('is-success');
                help.classList.toggle('is-danger');
                help.innerText = value ? 'valid' : 'invalid';
            }
        }

        validsStore[key] = value;
        isFormValid();
    }

    /**
     *
     * @param e
     */
    function inputKeyDownHandler(e)
    {
        var target = e.target;

        if (target.id === 'name_input')
        {
            setValidsStore(target.id, NAME_VALIDATE_RULE.test(target.value));
        }

        if (target.id === 'email_input')
        {
            setValidsStore(target.id, EMAIL_VALIDATE_RULE.test(target.value));
        }

        if (target.id === 'password_input')
        {
            setValidsStore(target.id, PASSWORD_VALIDATE_RULE.test(target.value));
        }

        if (target.id === 'about_textarea')
        {
            var charactersLeft = 150 - target.value.length;

            if (charactersLeft >= 0)
            {
                if (target.classList.contains('is-success'))
                {
                    target.classList.remove('is-success');
                }
                var help = document.getElementById(target.id + '_help');
                help.innerText = 'characters remaining: ' + charactersLeft;
            }

            if (!charactersLeft)
            {
                if (!target.classList.contains('is-success'))
                {
                    target.classList.add('is-success');
                }
            }
        }
    }

    function textareaKeyDownHandler(e)
    {
        var target = e.target;
        var keyCode = e.keyCode;

        var charactersLeft = 150 - target.value.length;

        if (!charactersLeft && keyCode !==8 && keyCode !== 46)
        {
            e.preventDefault();
        }
    }

    /**
     *
     * @param e
     */
    function selectChangeHandler(e)
    {
        var target = e.target;
        setValidsStore(target.id, !!target.selectedIndex);
    }

    /**
     *
     * @param e
     */
    function termsChangeHandler(e)
    {
        var target = e.target;
        setValidsStore(target.id, target.checked);
    }

    /**
     *
     * @param e
     */
    function registerFormClickHandler(e)
    {
        var target = e.target;

        if (target.tagName === "A")
        {
            e.preventDefault();
            console.log('Пока мы не придумали условия');
        }

        if (target.id === 'register_button')
        {
            var p = document.getElementById('output');

            // дежурный вариант, необходимо переработать
            p.innerText += 'name: ' + document.getElementById('name_input').value
                    + '\ne-mail: ' + document.getElementById('email_input').value
                    + '\npassword: ' + document.getElementById('password_input').value
                    + '\ngender: ' + genderSelect.value
                    + '\nabout yourself: ' + aboutTextarea.value;
        }
    }

    /**
     *
     */
    function isFormValid()
    {
        var numberOfValidFields = 0;
        for (var key in validsStore)
        {
            numberOfValidFields += validsStore[key];
        }

        registerButton.disabled = !(numberOfValidFields === Object.keys(validsStore).length);
    }

};

