<script>

//Button 1

function onclick(event) {
  scrollToSlide(2);
  progressTracker.setComplete(4);
}


function onclick(event) {
  scrollToSlide(2);
  progressTracker.setIncomplete(2);
  analytics('donate_ask', 'no');
}


//----------------------------------------------------------------

//Button 2

<button class="btn btn-primary" onclick="scrollToSlide(3); analytics('share_ask', 'yes');" type="button">Yes, I'll share</button>


function onclick(event) {
  scrollToSlide(3);
  analytics('share_ask', 'yes');
}


<button class="btn btn-primary" onclick="scrollToSlide(3); analytics('share_ask', 'yes');" type="button">Yes, I'll share</button>

function onclick(event) {
  scrollToSlide(4);
  progressTracker.setIncomplete(3);
  analytics('share_ask', 'no');
}


--------------------------------------------------------------------------

<div style="text-align: center; margin-top: 20px">
  <button class="text" type="button" onclick="scrollToSlide(4); progressTracker.setIncomplete(3);">Skip</button>
</div>

-----------------------------------------------------------------------------------------

<div style="text-align: center; margin-top: 20px">
    <a href="https://reprieve.org/uk/take-action/" class="text" target="_blank" type="button">Home</a>
</div>