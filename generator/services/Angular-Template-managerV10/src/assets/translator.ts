export const translator = {
    folderName: [`en`, `es`, `ta`],
    fileName: ['translation.json', 'error.json', 'validation.json'],
    source: `{\n\t\t"languages":{\n\t\t"en": "English",\n\t\t"ta": "தமிழ்",\n\t\t"es": "Español"\n\t\t}\n\t\t}`,
    error: `{\n\t\t"oops": "Oops!",\n\t\t"error_occured": "Error has occured",\n\t\t"error_occured_onload": "$t(error:error_occured)",\n\t\t"access_denied": "Access is denied",\n\t\t"reload": "Reload",\n\t\t"restart": "Restart",\n\t\t"contact_administrator_or_try_to_clear_browser_chache_and_restart_application": "Contact your administrator or clear browser cache and restart page.",\n\t\t"need_help_write_to_us": "Need help? Contact us.",\n\t\t"write": "Contact",\n\t\t"cookies": {\n\t\t"how_to": "How to clear browser cache and cookies",\n\t\t"chrome_clear": "Если у вас Google Chrome, то:<ol><li>Запустите Chrome.</li><li>Нажмите на значок&nbsp;<img src=\"//storage.googleapis.com/support-kms-prod/5C6FB52C8BBB2C12DC89B5F42F16B9B5E9CF\" width=\"18\" height=\"18\" alt=\"Настройка и управление Google Chrome\" title=\"Настройка и управление Google Chrome\"> на панели инструментов.</li><li>В меню <strong>Дополнительные инструменты</strong> нажмите <strong>Удаление данных о просмотренных страницах</strong>.</li><li>В окне \"Очистить историю\" выберите пункты <strong>Файлы cookie, а также другие данные сайтов и плагинов</strong> и <strong>Изображения и другие файлы, сохраненные в кеше</strong>.</li><li>В раскрывающемся меню в верхней части страницы выберите период, данные за который нужно удалить. Выберите вариант <strong>за все время</strong>, если вы хотите удалить все сведения.</li><li>Нажмите кнопку <strong>Очистить историю</strong>.</li></ol>"\n\t\t}\n\t\t}`,
    validation: `{\n\t\t"required": "Field is required.",\n\t\t"error": "Error occured.",\n\t\t"min": "Minimum value is {{min}}. Was {{actual}}.",\n\t\t"max": "Maximum value is {{max}}. Was {{actual}}.",\n\t\t"email": "$t(validation:_fill) valid e-mail.",\n\t\t"pattern": "$t(validation:_fill) valid value.",\n\t\t"maxlength": "Maximum length {{requiredLength}}.",\n\t\t"_fill": "Please fill in",\n\t\t"control_specific": {\n\t\t"technicalContact": {\n\t\t"firstName": {\n\t\t"required": "$t(validation:_fill) technical specialist's first name."\n\t\t},\n\t\t"lastName": {\n\t\t"required": "$t(validation:_fill) technical specialist's last name."\n\t\t},\n\t\t"middleName": {\n\t\t"required": "$t(validation:_fill) technical specialist's patronymic."\n\t\t}\n\t\t}\n\t\t}\n\t\t}`
}

export const english = {
    "home": "Home",
    "login": "Login",
    "admin": "Admin",
    "logout": "Logout",
    "authorization": "Authorization",
    "selectLanguage": "Select Language",
    "plsLogin": "Please Login or",
    "signup": "Signup",
    "email": "Email",
    "password": "Password",
    "facebook": "Facebook",
    "google": "Google",
    "welcomeHome": "Welcome to the app site created by Geppetto !!!",
    "dashboard": "Dashboard",
    "userManagement": "User Management",
    "register": "Register",
    "firstName": "FirstName",
    "lastName": "LastName",
    "submit": "Submit",
    "alreadyReg": "Already Registered",
    "loginHere": "Login Here"
};

export const tamil = {
    "home": "முகப்பு",
    "login": "உள் நுழை",
    "admin": "நிர்வாகம்",
    "logout": "வெளியேறு",
    "authorization": "அங்கீகாரம்",
    "selectLanguage": "மொழியை தேர்ந்தெடுங்கள்",
    "plsLogin": "தயவுசெய்து உள்நுழைக அல்லது",
    "signup": "பதிவு செய்ய",
    "email": "மின்னஞ்சல்",
    "password": "கடவுச்சொல்",
    "facebook": "முகநூல்",
    "google": "கூகிள்",
    "welcomeHome": "ஜெப்பெட்டோ உருவாக்கிய வலைத்தளத்திற்கு வருக !!!",
    "dashboard": "டாஷ்போர்டு",
    "userManagement": "பயனர் மேலாண்மை",
    "register": "பதிவு",
    "firstName": "முதல் பெயர்",
    "lastName": "கடைசி பெயர்",
    "submit": "சமர்ப்பிக்க",
    "alreadyReg": "ஏற்கனவே பதிவுசெய்திருந்தால்",
    "loginHere": "இங்கே உள்நுழைக"
};

export const spanish = {
    "home": "casa",
    "login": "Iniciar sesión",
    "admin": "administración",
    "logout": "cerrar sesión",
    "authorization": "autorización",
    "selectLanguage": "Seleccione el idioma",
    "plsLogin": "Por favor Iniciar sesión o",
    "signup": "Registro",
    "email": "correo electrónico",
    "password": "contraseña",
    "facebook": "Facebook",
    "google": "Google",
    "welcomeHome": "Bienvenido al sitio web creado por Geppetto !!!",
    "dashboard": "salpicadero",
    "userManagement": "Gestión de usuarios",
    "register": "Registro",
    "firstName": "Primer nombre",
    "lastName": "Apellido",
    "submit": "enviar",
    "alreadyReg": "Ya registrado",
    "loginHere": "Entre aquí"
};