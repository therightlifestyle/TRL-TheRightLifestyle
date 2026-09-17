/**
 * TRL Flagship — Interactive layer
 * Zero dependencies. Vanilla JS.
 */

(function () {
  'use strict';

  // ------------------------------------------------------------------
  // Mobile nav toggle
  // ------------------------------------------------------------------
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // ------------------------------------------------------------------
  // Close mobile nav on link click
  // ------------------------------------------------------------------
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // ------------------------------------------------------------------
  // Currency toggle: show both USD and PKR labels dynamically
  // ------------------------------------------------------------------
  const currencyToggle = document.getElementById('currency-toggle');
  if (currencyToggle) {
    // Already embedded; no extra toggle needed unless we inject one.
    // For future: if we inject a toggle, it would swap text nodes.
  }

  // ------------------------------------------------------------------
  // Quote helper — simple interactive card for quick estimate
  // ------------------------------------------------------------------
  const quoteForm = document.createElement('section');
  quoteForm.id = 'quote-helper';
  quoteForm.setAttribute('aria-label', 'Quick quote helper');
  quoteForm.innerHTML = `
    <div class="container" style="max-width: var(--content-narrow);">
      <span class="section-label">Quick quote</span>
      <h2>What do you need?</h2>
      <form id="quote-helper-form" style="margin-top: 1.5rem; display: grid; gap: 1rem;">
        <label style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">
          Service category
          <select id="quote-category" name="category" style="margin-top: 0.35rem; width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1.5px solid var(--border); background: var(--surface); color: var(--text); font-size: 0.95rem; font-family: inherit; cursor: pointer;">
            <option value="audit">Micro Audit — $35</option>
            <option value="starter">Automation Starter — $299</option>
            <option value="growth">Automation Growth OS — $799</option>
            <option value="premium">Automation Premium Scale — $1,999</option>
            <option value="website">Website — from $50</option>
            <option value="consulting">AI Consulting — from $10</option>
            <option value="freelance">Freelance task — from $5</option>
          </select>
        </label>
        <label style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);">
          Additional notes (optional)
          <textarea id="quote-notes" rows="3" style="margin-top: 0.35rem; width: 100%; padding: 0.75rem 1rem; border-radius: 10px; border: 1.5px solid var(--border); background: var(--surface); color: var(--text); font-size: 0.95rem; font-family: inherit; resize: vertical;" placeholder="Describe your project briefly..."></textarea>
        </label>
        <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;">Generate WhatsApp message →</button>
      </form>
      <p id="quote-output" style="margin-top: 1.25rem; padding: 1rem; border-radius: 10px; background: var(--surface-alt); border: 1px solid var(--border); display: none; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;"></p>
    </div>
  `;

  // Insert after pricing section
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    pricingSection.insertAdjacentElement('afterend', quoteForm);
  }

  // Handle quote form
  const form = document.getElementById('quote-helper-form');
  const output = document.getElementById('quote-output');
  if (form && output) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const category = document.getElementById('quote-category').value;
      const notes = document.getElementById('quote-notes').value.trim();
      const labels = {
        audit: 'Micro Audit ($35 / PKR 9,900)',
        starter: 'Automation Starter ($299 / PKR 84,000)',
        growth: 'Automation Growth OS ($799 / PKR 224,000)',
        premium: 'Automation Premium Scale ($1,999 / PKR 560,000)',
        website: 'Website (from $50 / $150 / $200+)',
        consulting: 'AI Consulting & Training (from $10 / $50 / $150+)',
        freelance: 'Freelance task (from $5 / $20 / $50+)',
      };
      const label = labels[category] || 'Service';
      const noteText = notes ? '\nNotes: ' + notes : '';
      const message = `Hi Rashid — I would like a quote for: ${label}.${noteText}\nCan we discuss scope and timeline?`;
      output.innerHTML = `<strong>Copy this into WhatsApp:</strong><br><br><code style="background: var(--surface); padding: 0.4rem 0.6rem; border-radius: 6px; border: 1px solid var(--border); word-break: break-word; display: inline-block;">${message.replace(/\n/g, '<br>')}</code><br><br><a href="https://wa.me/923190091457?text=${encodeURIComponent(message)}" class="btn-primary" style="margin-top: 0.75rem; display: inline-block;">Open WhatsApp with this message →</a>`;
      output.style.display = 'block';
      output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ------------------------------------------------------------------
  // Header shadow on scroll
  // ------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            header.style.borderBottomColor = 'var(--border)';
            header.style.boxShadow = '0 2px 12px rgba(15, 23, 42, 0.06)';
          } else {
            header.style.borderBottomColor = 'var(--border-subtle)';
            header.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
