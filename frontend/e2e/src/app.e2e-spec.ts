import {browser, by, element} from "protractor";

describe("Запуск приложения", function () {
  beforeEach(() => {
    browser.waitForAngularEnabled(false);
    browser.driver.manage().window().maximize();
    browser.driver.get("http://localhost:4200/");
  });
  it("Существует первое окно ввода", async () => {
    expect(await element(by.css("#input1")).isDisplayed()).toBe(true);
  });
  it("Существует второе окно ввода", async () => {
    expect(await element(by.css("#input2")).isDisplayed()).toBe(true);
  });
  it("Существует выпадающий список операций", async () => {
    expect(await element(by.css("#operationSelector")).isDisplayed()).toBe(true);
  });

  it("Существует кнопка расчёта", async () => {
    expect(await element(by.css("#calcButton")).isDisplayed()).toBe(true);
  });

  it("Корректный ответ сложения 41 + 19 = 60", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));

    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("41")));
    operationSelector.sendKeys("Сложить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("19")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("value")).toEqual("60");
  });

  it("Корректный ответ вычитания 93 - 92 = 1", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));
    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("93")));
    operationSelector.sendKeys("Вычесть");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("92")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("value")).toEqual("1");
  });

  it("Корректный ответ вычитания умножения 52 * 54 = 2808", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));
    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("52")));
    operationSelector.sendKeys("Умножить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("54")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("value")).toEqual("2808");
  });

  it("Корректный ответ деления 74 : 2 = 37", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));
    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("74")));
    operationSelector.sendKeys("Поделить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("2")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("value")).toEqual("37");
  });

  it("Пустая строка при вводе букв в ввод 1", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("бла-бла")));
    expect(await element(by.css("#input1")).getAttribute("value")).toEqual("");
  });

  it("Пустая строка при вводе букв в ввод 2", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input2"));
    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("бла-бла")));
    expect(await element(by.css("#input2")).getAttribute("value")).toEqual("");
  });

  it("Невозможно ввести 0 во второй ввод при операции деления", async () => {
    let system = element(by.css("#system"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    system.sendKeys("10");
    operationSelector.sendKeys("Поделить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("0")));
    expect(await element(by.css("#input2")).getAttribute("value")).toEqual("");
  });

  it("Проверка введения букв в 16 системе счисления", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    system.sendKeys("16");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("ABCF")));
    expect(await element(by.css("#input1")).getAttribute("value")).toEqual("ABCF");
  });

  it("Зелёный фон при ответе положительном числе (2 + 2 > 0)", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));

    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("2")));
    operationSelector.sendKeys("Сложить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("2")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("style")).toEqual(
      "background-color: green;"
    );
  });

  it("Чёрный фон при ответе нуле (0 + 0 = 0)", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));

    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("0")));
    operationSelector.sendKeys("Сложить");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("0")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("style")).toEqual(
      "background-color: black;"
    );
  });

  it("Красный фон при отрицательном ответе (100 - 111) < 0", async () => {
    let system = element(by.css("#system"));
    let input1 = element(by.css("#input1"));
    let input2 = element(by.css("#input2"));
    let operationSelector = element(by.css("#operationSelector"));
    let calcButton = element(by.css("#calcButton"));

    system.sendKeys("10");
    input1.click().then(() => input1.clear().then(() => input1.sendKeys("100")));
    operationSelector.sendKeys("Вычесть");
    input2.click().then(() => input2.clear().then(() => input2.sendKeys("111")));
    calcButton.click();
    expect(await element(by.css("#input3")).getAttribute("style")).toEqual(
      "background-color: red;"
    );
  });

});
