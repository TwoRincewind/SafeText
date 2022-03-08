function task(table, oldText, key, flag) {
    newText = "";
    for (index = 0; index < oldText.length; index++) {
        oldTextChar = oldText[index];
        keyChar = key[index % key.length];
        oldTextCharIndex = table.indexOf(oldTextChar);
        keyCharIndex = table.indexOf(keyChar);
        newTextCharIndex = (oldTextCharIndex + keyCharIndex * (flag ? 1 : -1) + table.length) % table.length;
        newTextChar = table[newTextCharIndex];
        newText += newTextChar;
    }
    return newText;
}

document.checking.button.addEventListener("click", execute);
document.checking.flag.addEventListener("click", flag_check);

function flag_check() {
    document.checking.button.value = (document.checking.flag.checked ? "Зашифровать" : "Расшифровать");
}

function execute() {
    var input_table = String(document.table.table.value);
    var input_text = String(document.input.textInput.value);
    var input_key = String(document.checking.key.value);
    var input_flag = Boolean(document.checking.flag.checked);
    var exec_flag = text_flag = key_flag = true;
    if (input_table.length == 0) {
        document.table.table.style.borderColor = "red";
        alert("Введите таблицу!");
        exec_flag = false;
    } else {
        document.table.table.style.borderColor = "green";
    }
    {
        if (input_text.length == 0) {
            document.input.textInput.style.borderColor = "red";
            alert("Введите текст!");
            exec_flag = false;
        } else {
            document.input.textInput.style.borderColor = "green";
        }
        for (i = 0; i < input_text.length; i++) {
            if (input_text[i] != "\n" && !input_table.includes(input_text[i])) {
                if (text_flag) {
                    alert("Похоже, что текст содержит символы, которых нет в таблице...");
                    text_flag = false;
                }
            }
        }
    }
    {
        if (input_key.length == 0) {
            document.checking.key.style.borderColor = "red";
            alert("Введите ключ!");
            exec_flag = false;
        } else {
            document.checking.key.style.borderColor = "green";
        }
        for (i = 0; i < input_key.length; i++) {
            if (input_key[i] != "\n" && !input_table.includes(input_key[i])) {
                if (key_flag) {
                    alert("Похоже, что ключ содержит символы, которых нет в таблице...");
                    key_flag = false;
                }
            }
        }
    }
    if (exec_flag && text_flag && key_flag) {
        var input_list = input_text.split("\n");
        document.output.textOutput.value = "";
        for (i = 0; i < input_list.length; i++) {
            if (i) {
                document.output.textOutput.value += "\n";
            }
            document.output.textOutput.value += String(task(input_table, input_list[i], input_key, input_flag));
        }
    }
}

flag_check();