// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.value = ko.observable("")
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Players');
    self.displayName = 'NBA Players List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.favsstill = function(Id){
        a = JSON.parse(window.localStorage.getItem('favPlayers0'));
        for (var i = 0; i < a.length; i++) {
            for(var j=0;j<self.records().length;j++){
            if(a[i].Id==self.records()[j].Id){
            $('#fav_'+a[i].Id).addClass('text-danger')
            }}}
    }
    self.favoritePlayer = function (id) {
        console.log('favourite click!')
        $('#fav_'+id).addClass('text-danger')
        localStorage.setItem("class", "text-danger");
        if (JSON.parse(window.localStorage.getItem('favPlayers0')) == null) {
            $('#fav_'+id).addClass('text-danger')
            localStorage.setItem("addClass", "text-danger");


            console.log('no favPlayers in local storage, lets create it');
            window.localStorage.setItem('favPlayers0', '[]');
            var a = JSON.parse(window.localStorage.getItem('favPlayers0'));
            for(var i=0;i<self.records().length;i++){
                if(self.records()[i].Id == id){
                b = a.concat(self.records()[i]);
            }}
            window.localStorage.setItem('favPlayers0', JSON.stringify(b));
        } else {
            var c = JSON.parse(window.localStorage.getItem('favPlayers0'))
            for (var i = 0; i < c.length; i++) {
                if (id == c[i].Id) {
                    c.splice(i, 1); // remove the item at index i
                    window.localStorage.setItem('favPlayers0', JSON.stringify(c)); // update the local storage
                    console.log('Player unfavourited')
                    console.log(JSON.parse(window.localStorage.getItem('favPlayers0')))
                    $('#fav_'+id).removeClass('text-danger')
                    localStorage.setItem("removeClass", "text-danger");

                    return false
                }
            }
            var a = JSON.parse(window.localStorage.getItem('favPlayers0'));
            for(var i=0;i<self.records().length;i++){
                if(self.records()[i].Id == id){
                b = a.concat(self.records()[i]);
            }}
            window.localStorage.setItem('favPlayers0', JSON.stringify(b));
            console.log('Player not favourited, added to favourites')
        }
        console.log(JSON.parse(window.localStorage.getItem('favPlayers0')))
    }
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };

    self.search = function() {
        let a = $("#srch").val().length
        console.log(a)
        
            if ($("#srch").val() === "") {
                //showLoading();
                var pg = getUrlParameter('page');
                console.log(pg);
                if (pg == undefined){
                    self.activate(1);
                }else {
                    self.activate(pg);
                }
            } else {
                if (a > 2){
                var changeUrl = 'http://192.168.160.58/NBA/API/Players/Search?q=' + $("#srch").val();
            ajaxHelper(changeUrl, 'GET').done(function(data) {
                console.log(data.length)
                if (data.length == 0) {
                    self.value = "";
                }
                self.totalPages(1)
                console.log(data);
                //showLoading();

                self.records(data);
                self.totalRecords(data.length);
            // hideLoading();
                });
            };
    }};

    self.onChange = function() {
        self.search();
        return true;
    };
    
    // ko.bindingHandlers.cuttext = {
        //         update: function (element, valueAccessor,allBindingsAccessor) {
        //             var length = allBindingsAccessor().length || 4294967295; //SAFE MAX_INT
        //             var trailing = allBindingsAccessor().trailing || "";
        //             var value = ko.utils.unwrapObservable(valueAccessor());
        //             if (length<value.length){
        //                 value = value.substr(0,length)+trailing;
        //             }
        //             $(element).text(value);
        //         }
        // };

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getPlayers...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            self.favsstill(data.Id)

            //self.SetFavourites();
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");

     
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})