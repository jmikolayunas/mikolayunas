// ============================================
// STORIES PAGE - MODAL FUNCTIONALITY
// ============================================

// Full story data
const storiesData = {
  rainier: {
    category: "Memorial",
    title: "Where We Scattered His Ashes",
    image: "images/story-rainier.jpg",
    client: "Sarah M.",
    location: "Mount Rainier, Washington",
    year: "2023",
    materials: "Walnut, blue epoxy, brass summit marker",
    size: "36\" × 48\"",
    body: `
      <p>
        Sarah's father, Robert, spent three decades as a mountain guide on Mount Rainier. 
        He taught her to read topographic maps before she could read books, showed her how 
        glaciers carved valleys over millennia, explained why certain routes were sacred to 
        the indigenous peoples who lived in the mountain's shadow for thousands of years.
      </p>
      <p>
        When he died unexpectedly at 67—not on the mountain, but in a hospital bed—Sarah knew 
        exactly where his ashes needed to go. Camp Muir, at 10,000 feet, where he'd spent 
        countless nights preparing climbers for summit attempts. Where he'd proposed to her mother. 
        Where he'd taught Sarah to navigate by starlight.
      </p>
      <div class="modal-story-quote">
        <p>
          "I wanted something that honored the whole mountain, not just one moment. Every ridge 
          he climbed, every glacier he crossed, every trail he guided—I wanted it all there, 
          tangible, permanent."
        </p>
      </div>
      <p>
        During our consultation, Sarah shared stories for two hours. I learned about Robert's 
        philosophy of mountaineering—"respect the mountain, it was here before you and will be 
        here after"—and how that shaped her own relationship with wilderness.
      </p>
      <p>
        We decided on walnut for its warmth and figured grain, reminiscent of weathered wood 
        in alpine huts. Blue-tinted epoxy would represent the glaciers he knew so intimately. 
        And a small brass marker at Camp Muir's exact coordinates—10,080 feet—where his ashes rest.
      </p>
      <p>
        When Sarah came to pick up the finished piece, she stood in front of it for twenty 
        minutes without speaking. She traced the contour lines with her finger, found the 
        trails she'd hiked with him, located the crevasse where they'd once helped with a rescue.
      </p>
      <p>
        "It's not just a map," she finally said. "It's every summer, every sunrise hike, every 
        story he told. It's <em>him</em>."
      </p>
      <p>
        The piece now hangs in her living room in Seattle. Her children—Robert's grandchildren—
        ask her to tell stories about "Grandpa's mountain." The topography holds the narratives.
      </p>
    `
  },
  tahoe: {
    category: "Wedding Gift",
    title: "The Lake Where We Said Yes",
    image: "images/story-tahoe.jpg",
    client: "James & Michael R.",
    location: "Lake Tahoe, California/Nevada",
    year: "2024",
    materials: "Ash wood, teal epoxy bathymetry, silver inlay",
    size: "42\" × 42\"",
    body: `
      <p>
        James and Michael got engaged on a kayak in the middle of Lake Tahoe, 900 feet above 
        the deepest point in the lake—1,645 feet below them. Michael had been planning it for 
        months, waiting for the perfect calm morning when the water turned to glass and the 
        Sierra peaks reflected perfectly.
      </p>
      <p>
        They didn't tell anyone about the proposal for three days. They wanted to keep that 
        moment—suspended between sky and depth—just for themselves a little longer.
      </p>
      <p>
        Six months later, their parents approached me with a wedding gift idea. They wanted 
        a bathymetric map of Tahoe—not just the shoreline, but the underwater topography. 
        The <em>depth</em> where the proposal happened mattered as much as the location.
      </p>
      <div class="modal-story-quote">
        <p>
          "We wanted them to remember they'd said yes while floating above an ancient, 
          unknowable depth. That their love had that same kind of mystery and permanence."
        </p>
      </div>
      <p>
        I sourced NOAA bathymetric data and translated underwater contours into relief. 
        The lake bed drops dramatically—gentle slopes near the shore, then sudden cliffs 
        into the depths. We chose teal epoxy in graduated shades: pale aqua for shallows, 
        deep indigo for the abyss.
      </p>
      <p>
        A tiny silver inlay marks the exact GPS coordinates where Michael proposed: 
        39.0968° N, 120.0324° W—right above the deepest point.
      </p>
      <p>
        At the wedding reception, when the piece was unveiled, Michael traced his finger 
        from the shore to the marked spot. "This is where we were floating," he told the room. 
        "This is where everything changed."
      </p>
      <p>
        The piece now hangs in their home in Oakland. They've added a small plaque beneath it 
        with the date, coordinates, and depth: <em>1,645 feet below, infinity ahead</em>.
      </p>
    `
  },
  archipelago: {
    category: "Heritage",
    title: "Five Generations on These Islands",
    image: "images/story-archipelago.jpg",
    client: "The Peterson Family",
    location: "Penobscot Bay, Maine",
    year: "2023",
    materials: "White oak, ocean blue resin, weathered finish",
    size: "48\" × 60\"",
    body: `
      <p>
        The Peterson family has fished the waters around Penobscot Bay since 1847. Lobster, 
        primarily, but also herring, mackerel, and whatever else the Gulf of Maine offered up. 
        Five generations have worked these islands, channels, and ledges—knowledge passed down 
        not through charts, but through memory and experience.
      </p>
      <p>
        "My great-great-grandfather could navigate these waters in fog so thick you couldn't 
        see your own hand," Robert Peterson told me during our initial call. "No GPS, no radar. 
        He knew every rock, every current, every place the bottom dropped off."
      </p>
      <p>
        The family was consolidating their fishing operation—three brothers retiring, the next 
        generation taking over. They wanted something that honored the territory their ancestors 
        had worked, fought for, and ultimately passed down.
      </p>
      <div class="modal-story-quote">
        <p>
          "This isn't just geography. It's our livelihood, our history, our inheritance. 
          Every island has a story. Every channel has a name only we know."
        </p>
      </div>
      <p>
        We mapped their historical fishing grounds—roughly 200 square miles of archipelago, 
        from Islesboro to Deer Isle. The challenge was showing both the land and the underwater 
        topography where they set their traps.
      </p>
      <p>
        I carved the islands in white oak—weathered and salted like the docks they work from—
        and poured ocean-blue resin for the water, with darker hues indicating deeper channels. 
        The finish was left deliberately raw, mimicking driftwood.
      </p>
      <p>
        At the unveiling, the eldest brother, 83-year-old William, pointed to a small inlet. 
        "That's where my father taught me to haul traps," he said quietly. "I was seven years old."
      </p>
      <p>
        The piece now hangs in their shared warehouse in Stonington. Every Peterson who works 
        the water sees it daily—a reminder that they're part of something that stretches back 
        nearly two centuries and, hopefully, forward just as far.
      </p>
    `
  },
  bigsur: {
    category: "New Beginning",
    title: "Where I Decided to Stay Alive",
    image: "images/story-bigsur.jpg",
    client: "Elena K.",
    location: "Big Sur, California",
    year: "2024",
    materials: "Maple, translucent amber resin, raw edge",
    size: "30\" × 40\"",
    body: `
      <p>
        Elena doesn't talk much about the years before Big Sur. Depression, she'll say if asked. 
        The kind that makes you forget why you ever thought life was worth living. The kind that 
        makes driving off a cliff seem less like an ending and more like a relief.
      </p>
      <p>
        She drove to Big Sur with that intention. Parked at a turnout near Bixby Bridge, walked 
        to the edge, looked down at the rocks and surf 280 feet below. Stood there for two hours.
      </p>
      <p>
        What changed her mind, she told me during our consultation, wasn't a revelation or an 
        epiphany. It was the <em>scale</em>. The cliffs had been there for millions of years. 
        The ocean had been carving them for longer. Her pain, however infinite it felt, was 
        temporary in geological time.
      </p>
      <div class="modal-story-quote">
        <p>
          "I realized I was standing on something ancient and enduring, and maybe—maybe—I could 
          borrow some of that endurance. Just for one more day. And then another."
        </p>
      </div>
      <p>
        Five years later, Elena was doing well. Therapy, medication, community, purpose—all the 
        things that actually help. She wanted a piece that honored Big Sur not as the place she 
        almost died, but as the place she chose to live.
      </p>
      <p>
        We focused on the cliffs' dramatic relief—3,000-foot drops from ridge to ocean. Maple 
        for its lightness (she wanted something that felt open, not heavy). Translucent amber 
        resin for the water, so light could pass through.
      </p>
      <p>
        The edges were left raw and natural—no frame, no polish—because, as Elena said, 
        "Healing isn't about being perfect. It's about being honest about the rough parts."
      </p>
      <p>
        When she came to see the finished piece, she stood in front of it for a long time. 
        "It's beautiful," she finally said. "But it's also true. And that matters more."
      </p>
      <p>
        The piece hangs in her therapist's office now—with Elena's permission, as a reminder 
        to other clients that geography can hold both despair and hope, and sometimes choosing 
        to stay is its own kind of summit.
      </p>
    `
  },
  sanfrancisco: {
    category: "Family Home",
    title: "The City That Built Us",
    image: "images/story-sanfrancisco.jpg",
    client: "The Chen Siblings",
    location: "San Francisco, California",
    year: "2023",
    materials: "Birch, graphite stain, brass markers",
    size: "36\" × 36\" (3 identical pieces)",
    body: `
      <p>
        The Chen family immigrated to San Francisco in 1978, settling in the Richmond District. 
        Three children—Amy, David, and Lisa—grew up in a three-bedroom house on 34th Avenue, 
        learning to navigate the city's steep hills, fog patterns, and hidden staircases.
      </p>
      <p>
        Their parents worked long hours—their father in a restaurant, their mother sewing in 
        the garment district—but Sundays were for family walks. Golden Gate Park, Ocean Beach, 
        up Twin Peaks to show the kids how the whole city spread out below them.
      </p>
      <p>
        When their parents passed away within six months of each other, the siblings had to 
        sell the family home. The San Francisco real estate market had made it impossible to 
        keep—even split three ways, none of them could afford the property taxes.
      </p>
      <div class="modal-story-quote">
        <p>
          "We knew we were losing the house, but it felt like we were losing the whole city. 
          Every hill we climbed, every street we walked—it was all connected to them."
        </p>
      </div>
      <p>
        Amy reached out with an unusual request: three identical pieces, one for each sibling. 
        Same topography, same materials, same finishing—so wherever they ended up, they'd each 
        have the same San Francisco.
      </p>
      <p>
        We focused on the seven-by-seven-mile grid—the famous 49 hills, the dramatic elevation 
        changes that make the city feel simultaneously vast and intimate. Birch for its subtle 
        grain, graphite stain to evoke fog. Brass markers for significant locations: their 
        childhood home, their parents' workplaces, Twin Peaks, Ocean Beach.
      </p>
      <p>
        At the unveiling, the three siblings stood together, each holding their piece. They 
        noticed immediately that the grain patterns were different—same tree, different boards—
        which made them smile.
      </p>
      <p>
        "It's like us," David said. "Same city, same family, same story. But each of us 
        experienced it a little differently."
      </p>
      <p>
        The pieces now hang in three different cities—Amy in Seattle, David in Portland, 
        Lisa in Oakland—but they're video-chatting monthly, sharing stories about the city 
        that built them, the parents who raised them, and the topography they'll always share.
      </p>
    `
  },
  tetons: {
    category: "Adventure",
    title: "Every Summer Since 1992",
    image: "images/story-tetons.jpg",
    client: "Thomas D. (for his father)",
    location: "Grand Teton Range, Wyoming",
    year: "2024",
    materials: "Cherry, charcoal finish, brass trail markers",
    size: "48\" × 72\"",
    body: `
      <p>
        For thirty-two years, the Davis family has spent three weeks every August in the Tetons. 
        Same cabin near Jenny Lake. Same trails: Cascade Canyon, Paintbrush-Canyons Loop, the 
        climb to the Lower Saddle on Grand Teton. Same campfire spot where they cook trout and 
        tell stories.
      </p>
      <p>
        Thomas's father, William, turned sixty this year. The family wanted to give him something 
        that captured three decades of summits, scrambles, and shared silence in high places.
      </p>
      <p>
        During our consultation, Thomas spread out a topographic map and traced the trails 
        they'd hiked together. "This is where we saw a grizzly in 1998. This is where my sister 
        twisted her ankle in 2007. This is where Dad proposed to his second wife in 2015."
      </p>
      <div class="modal-story-quote">
        <p>
          "The mountains don't change much, but we do. Every summer we're older, slower, 
          different. But we keep coming back. That consistency—that commitment—that's what 
          I wanted to honor."
        </p>
      </div>
      <p>
        We decided on a large-scale piece—48" × 72"—to capture the full Teton range from 
        Teewinot to Mount Moran. Cherry wood, which would darken and deepen over time (just 
        like memories). Charcoal finish to evoke the granite peaks.
      </p>
      <p>
        The special detail: brass markers for every trail they'd hiked together over thirty years. 
        Fourteen distinct routes, each marked with its name in tiny engraved letters.
      </p>
      <p>
        At William's birthday party, the family unveiled the piece. He walked up to it slowly, 
        finding each trail, calling out memories: "This is where Tom caught his first fish. 
        This is where Sarah decided to become a geologist. This is where we scattered your 
        mother's ashes."
      </p>
      <p>
        The piece now hangs in William's home in Denver, but the family has started a tradition: 
        every year after their August trip, they gather around it with a bottle of whiskey and 
        add a new story. The topography holds the past; the ritual builds the future.
      </p>
    `
  }
};

// Modal elements
const storyModal = document.getElementById('story-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

// Story card links
const storyLinks = document.querySelectorAll('.story-card-link');

storyLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const storyId = link.dataset.story;
    openStoryModal(storyId);
  });
});

// Open modal with story content
function openStoryModal(storyId) {
  const story = storiesData[storyId];
  
  if (!story) return;
  
  modalContent.innerHTML = `
    <span class="modal-story-category">${story.category}</span>
    <h1 class="modal-story-title">${story.title}</h1>
    <img src="${story.image}" alt="${story.title}" class="modal-story-image" />
    <div class="modal-story-body">
      ${story.body}
    </div>
    <div class="modal-story-details">
      <div class="modal-detail-item">
        <span class="modal-detail-label">Client</span>
        <span class="modal-detail-value">${story.client}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Location</span>
        <span class="modal-detail-value">${story.location}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Year</span>
        <span class="modal-detail-value">${story.year}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Materials</span>
        <span class="modal-detail-value">${story.materials}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Size</span>
        <span class="modal-detail-value">${story.size}</span>
      </div>
    </div>
    <div class="modal-story-cta">
      <a href="commission.html" class="btn btn--accent">Start Your Own Story</a>
    </div>
  `;
  
  storyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Update URL hash
  window.location.hash = `story-${storyId}`;
}

// Close modal
function closeStoryModal() {
  storyModal.classList.remove('active');
  document.body.style.overflow = '';
  window.location.hash = '';
}

modalClose.addEventListener('click', closeStoryModal);

// Close on background click
storyModal.addEventListener('click', (e) => {
  if (e.target === storyModal) {
    closeStoryModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && storyModal.classList.contains('active')) {
    closeStoryModal();
  }
});

// Open story from URL hash on page load
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash.startsWith('#story-')) {
    const storyId = hash.replace('#story-', '');
    if (storiesData[storyId]) {
      setTimeout(() => openStoryModal(storyId), 100);
    }
  }
});

console.log('✓ Stories page scripts loaded');