$(function () {
    // Moves to win
    var toWin = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    function Player(name, mark) {
        this.name = name;
        this.mark = mark;
    }

    var computer = new Player('Player 2', 'x');
    var human = new Player('Player 1', 'o');
    var humanTurn = true;

    function getCurrentPlayer() {
        return humanTurn ? human : computer;
    }

    function hasMove(marks, move) {
        var resp;
        for (var i = 0; i < move.length; i++) {
            var value = move[i];
            if (marks.includes(value)) {
                resp = true;
            } else {
                return false;
            }
        }
        return resp;
    }

    function winSomebody() {
        var xMarks = $('.' + getCurrentPlayer().mark).map(
            function () {
                var value = parseInt($(this).attr('value'));
                return value;
            }).get();
        for (var i = 0; i < toWin.length; i++) {
            var move = toWin[i];
            if (hasMove(xMarks, move)) {
                return true;
            }
        }
        return false;
    }

    $('.col').click(function (event) {
        var currentPlayer = getCurrentPlayer();
        var target = $(event.currentTarget);
        target.addClass(currentPlayer.mark);
        target.find('.' + currentPlayer.mark).show();
        target.off('click');
        if (winSomebody()) {
            $('.player-' + currentPlayer.mark).css('background-color', '#53DD6C');
        } else {
            humanTurn = !humanTurn;
            currentPlayer = getCurrentPlayer();
            $('.player div').css('background-color', '#0A20D9');
            $('.player-' + currentPlayer.mark).css('background-color', '#3344D6');
        }
    });
});