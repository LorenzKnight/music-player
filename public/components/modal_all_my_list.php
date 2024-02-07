<div class="formular_songs_list" id="formular_songs_list">
    <h4></h4>
    <div class="create-list-holder" id="clic-create-list">
        <button class="button-add-playlist" id="button-add-playlist">New playlist</button>
    </div>
    <div class="create-list-holder" id="input-list" style="display: none;">
        <input type="text" name="input-playlist" id="input-playlist" /><button class="button-add-create" id="button-add-create">add and create</button>
    </div>
    <table class="music-list" id="music-playlists" cellspacing="0">
    <?php
    foreach($all_my_lists as $all_list) {
    ?>
        <tr class="playlistContainer" data-playListId="<?= $all_list['listingsId']; ?>">
            <td>
                <div class="list-mini-cover">
                    <img src="images/profile/<?php ?>perfil.png" alt="">
                </div>
            </td>
            <td>
                <?= $all_list['listName']; ?>
            </td>
        </tr>
    <?php
    }
    ?>
    </table>
</div>