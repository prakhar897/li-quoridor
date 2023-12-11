import React from "react";
import { connect } from "react-redux";
import move1 from "../assets/move1.png";
import move2 from "../assets/move2.png";
import move3 from "../assets/move3.png";
import move4 from "../assets/move4.png";
import move5 from "../assets/move5.png";

const Rules = () => {
	return (
		<div id="all_elements" className="bg-gray-100 p-4">
			<div id="header" className="text-center mb-4">
				<h1 id="site_title" className="text-3xl font-bold">
					Rules
				</h1>
			</div>

			<hr className="my-4" />
			<hr className="my-4" />

			<div id="qf_contents" className="mb-6">
				<h3 className="font-semibold text-lg">Objective</h3>
				<p>
					<b>
						The goal is to be the first player to move their piece
						to the goal.
					</b>
				</p>
				<p>
					<img src={move1} alt="move1" className="mb-2" />
					The game starts with each player's piece positioned in the
					middle of the line, opposite each other. The goal can be any
					space along the innermost line reachable from the starting
					point.
				</p>
				<p>
					During your turn, you can move one piece vertically or
					horizontally, place a board, or choose an action. Each
					player has 10 boards, totaling 20 pieces. These boards cover
					two grid spaces widthwise.
				</p>
				<p>
					Officially known as "fences," they will be referred to as
					"boards" here. This game involves strategically placing
					these boards to hinder your opponent's progress while
					navigating your own piece to reach the goal first.
				</p>

				<hr className="my-4" />

				<h3 className="font-semibold text-lg">Placing Boards</h3>
				<img src={move2} alt="move2" className="mb-2" />
				<p>
					Place the board sideways to cover two grid spaces. Do not
					position it vertically or leave it halfway.
				</p>
				<p>
					The most crucial rule is ensuring that your placement does
					not block the opponent's path to their goal. There must
					always be at least one viable route for the opponent's piece
					to reach its goal. Failure to do so might result in
					surrounding the opponent's piece and ending the game.
				</p>

				<hr className="my-4" />

				<h3 className="font-semibold text-lg">Moving Pieces</h3>
				<img src={move3} alt="move3" className="mb-2" />
				<p>
					A piece can move one grid space vertically or horizontally
					in a turn. However, movement is restricted in directions
					where there are edges or walls.
				</p>
				<img src={move4} alt="move4" className="mb-2" />
				<p>
					Special moves are permitted only when an opponent's piece
					obstructs the path. If an opponent's piece is in front and
					an empty space lies behind it, the player can jump over and
					displace the opponent's piece. Alternatively, if the
					opponent's piece blocks a forward move but empty spaces are
					available to the left or right, a diagonal move is allowed.
				</p>
				<img src={move5} alt="move5" className="mb-2" />
			</div>

			<hr className="my-4" />
		</div>
	);
};

export default connect(null, null)(Rules);
