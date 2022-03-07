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
    if ((input_table.length || input_text.length || input_key.length) == 0) {
        alert("Все значения должны быть длинее нуля!");
    }
    for (i = 0; i < input_text.length; i++) {
        if (input_text[i] != "\n" && !input_table.includes(input_text[i])) {
            alert("Похоже, что текст содержит символы, которых нет в таблице...");
            return;
        }
    }
    for (i = 0; i < input_key.length; i++) {
        if (input_key[i] != "\n" && !input_table.includes(input_key[i])) {
            alert("Похоже, что ключ содержит символы, которых нет в таблице...");
            return;
        }
    }
    var input_list = input_text.split("\n");
    document.output.textOutput.value = String();
    for (i = 0; i < input_list.length; i++) {
        if (i) {
            document.output.textOutput.value += "\n";
        }
        document.output.textOutput.value += String(task(input_table, input_list[i], input_key, input_flag));
    }
}

flag_check();