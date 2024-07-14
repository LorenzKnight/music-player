<header>
	<div class="container">
		<nav>
			<ul class="menu">
				<li>
					<div class="logo">
					<h3>Music Drive</h3>
					</div>
				</li>
				<li><a href="#">News</a></li>
				<li><a href="discover?library=1">My Library</a></li>
				<li class="search-holder">
					<input type="text" name="searchField" id="searchField" class="search-field">
				</li>
				<li><a href="<?= isset($_SESSION['mp_UserId']) ? 'discover?album=1' : 'discover?login=1' ?>">Explore</a></li>
				<li><a href="<?= isset($_SESSION['mp_UserId']) ? 'discover?uploader=1' : 'discover?login=1' ?>">Upload</a></li>
				<?php if(isset($_SESSION['mp_UserId']) && $_SESSION['mp_UserId'] != null) { ?>
				<li>
					<div class="profile" id="profileTrigger">
						<img src="images/profile/<?= isset($user_data['image']) ? 'NonProfilePic.png' : $user_data['image']; ?>" alt="">
					</div>
					<div id="profileDropdown" style="display: none;">
						<ul>
							<li><a href="#"><?= $user_data['name'].' '.$user_data['surname']; ?></a></li>
							<li><a href="#">Settings</a></li>
							<li><a href="logout.php">Logout</a></li>
						</ul>
					</div>
				</li>
				<?php } else { ?>
				<li><a href="discover?login=1">Log in</a></li>
				<?php } ?>
			</ul>
		</nav>
	</div>
</header>