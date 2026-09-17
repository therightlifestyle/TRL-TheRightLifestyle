/**
 * TRL Flagship — interactive layer
 * Zero dependencies. Vanilla JS. Progressive enhancement only:
 * every page renders fully without JavaScript.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Mobile navigation toggle
  ------------------------------------------------------------------ */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });

    // Close the menu after following any link inside it.
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------
     Quick quote helper (index.html only)
     Builds a prefilled WhatsApp message from the static form markup.
     User-entered notes are only ever inserted via textContent, never
     interpreted as HTML.
  ------------------------------------------------------------------ */
  const quoteForm = document.getElementById('quote-helper-form');
  const quoteOutput = document.getElementById('quote-output');

  if (quoteForm && quoteOutput) {
    const SERVICE_LABELS = {
      audit: 'Micro Audit ($35 / PKR 9,900)',
      starter: 'Automation Starter ($299 / PKR 84,000)',
      growth: 'Automation Growth OS ($799 / PKR 224,000)',
      premium: 'Automation Premium Scale ($1,999 / PKR 560,000)',
      website: 'Website (from $50 / $150 / $200+)',
      consulting: 'AI Consulting & Training (from $10 / $50 / $150+)',
      freelance: 'Freelance task (from $5 / $20 / $50+)',
    };
    const WHATSAPP_NUMBER = '923190091457';

    quoteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const category = document.getElementById('quote-category').value;
      const notes = document.getElementById('quote-notes').value.trim();
      const label = SERVICE_LABELS[category] || 'Service';
      const noteText = notes ? `\nNotes: ${notes}` : '';
      const message = `Hi Rashid — I would like a quote for: ${label}.${noteText}\nCan we discuss scope and timeline?`;

      const heading = document.createElement('strong');
      heading.textContent = 'Copy this into WhatsApp:';

      const preview = document.createElement('code');
      preview.className = 'quote-preview';
      preview.textContent = message;

      const whatsappLink = document.createElement('a');
      whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      whatsappLink.className = 'btn-primary quote-link';
      whatsappLink.textContent = 'Open WhatsApp with this message →';

      quoteOutput.replaceChildren(
        heading,
        document.createElement('br'),
        preview,
        whatsappLink
      );
      quoteOutput.style.display = 'block';
      quoteOutput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ------------------------------------------------------------------
     Sticky header — elevated state once the page is scrolled
  ------------------------------------------------------------------ */
  const header = document.querySelector('.site-header');

  if (header) {
    let ticking = false;

    const updateHeader = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

})();
