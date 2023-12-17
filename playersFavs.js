// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.records = ko.observableArray([]);
    array = localStorage.getItem('favPlayers0');
    console.log('ahhhhhhhhh' + array)
    self.records(JSON.parse(array));

}

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
console.log('fjsanfoiaf')});

function clearstuff() {
    localStorage.clear()
    location.reload()
}