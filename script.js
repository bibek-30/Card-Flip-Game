$(document).ready(function () {
  var cards = $(".card");

  var shuffledCards = Array.from(cards);

  shuffledCards.sort(function () {
    return (Math.random() - 0.5) * 2;
  });

  $(".game-board").empty().append(shuffledCards);

  let flippedCards = [];
  let matchedCards = [];
  let player = 1;
  let player1 = 0;
  let player2 = 0;

  $(".card").each(function () {
    $(this).click(function () {
      if (!$(this).hasClass("flipped") && !$(this).hasClass("matched")) {
        const value = $(this).attr("data-value");
        $(this).addClass("flipped");
        flippedCards.push(value);

        if (flippedCards.length === 2) {
          const card1 = flippedCards[0];
          const card2 = flippedCards[1];
          if (card1 === card2) {
            matchedCards.push(card1, card2);
            $('.card[data-value="' + card1 + '"]').addClass("matched");
            $('.card[data-value="' + card2 + '"]').addClass("matched");
            recordScore();
            flippedCards = [];
            if (matchedCards.length === $(".card").length) {
              alert("Congratulations! You won the game!");
            }
          } else {
            setTimeout(function () {
              $(".card.flipped").removeClass("flipped");
              switchPlayer();
              flippedCards = [];
            }, 500);
          }
        }
      }
    });
  });

  function recordScore() {
    if (player === 1) {
      player1++;
    } else {
      player2++;
    }
    updateScore();
  }

  function switchPlayer() {
    player = player === 1 ? 2 : 1;

    updateScore();

    if (player == 1) {
      $(".player1").addClass("active");
      $(".player2").removeClass("active");
    } else {
      $(".player2").addClass("active");
      $(".player1").removeClass("active");
    }
  }

  function updateScore() {
    $(".player1 span").text(player1);
    $(".player2 span").text(player2);
  }
});
