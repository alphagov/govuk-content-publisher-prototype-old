'use strict';

(function ($, window, document, undefined) {
  var settings
  var columnSelector = 'ul'
  var itemSelector = 'li'

  /** Returns a list of the currently selected items. */
  function chain () {
    return $('.app-miller-column > .selected')
  }

  /** Add the breadcrumb path using the chain of selected items. */
  function breadcrumb () {
    var $breadcrumb = $('.app-breadcrumb').empty()

    chain().each(function () {
      var $crumb = $(this)
      $('<span>')
        .text($crumb.text().trim())
        .click(function () {
          $crumb.click()
        }).appendTo($breadcrumb)
    })
  }

  /** Ensure the viewport shows the entire newly expanded item. */
  function animation ($columns, $column) {
    var width = 0
    var level = 0
    chain().not($column).each(function () {
      level++
      width += $(this).outerWidth(true)
    })

    $column.parent().addClass('app-miller-column--level-' + level)

    // Option 1: Resize root columns
    if (level > 1) {
      $('.app-miller-column--level-0').addClass('app-miller-column--narrow')
      $('.app-miller-column--level-1').addClass('app-miller-column--medium')
    } else {
      $('.app-miller-column--narrow').removeClass('app-miller-column--narrow')
      $('.app-miller-column--medium').removeClass('app-miller-column--medium')
    }

    // Options 2: Keep columns width and scroll right
    // $columns.stop().animate({
    //   scrollLeft: width
    // }, settings.delay)
  }

  /** Convert nested lists into columns using breadth-first traversal. */
  function unnest ($columns) {
    var queue = []
    var $node

    // Push the root unordered list item into the queue.
    queue.push($columns.children())

    while (queue.length) {
      $node = queue.shift()

      $node.children(itemSelector).each(function (item, el) {
        var $this = $(this)
        var $child = $this.children(columnSelector)
        var $ancestor = $this.parent().parent()

        // Retain item hierarchy (because it is lost after flattening).
        if ($ancestor.length && ($this.data('ancestor') == null)) {
          // Use addBack to reset all selection chains.
          $(this).siblings().addBack().data('ancestor', $ancestor)
        }

        if ($child.length) {
          queue.push($child)
          $(this).data('child', $child).addClass('parent')
        }

        // Causes item siblings to have a flattened DOM lineage.
        $(this).parent(columnSelector).appendTo($columns).addClass('app-miller-column')
      })
    }
  }

  /** Hide columns (not the first). */
  function collapse () {
    $('.app-miller-column:gt(0)').addClass('collapse')
  }

  /** Returns the last selected item (i.e., the current cursor). */
  function current () {
    return chain().last()
  }

  /** Hide columns (not the first), remove selections, update breadcrumb. */
  function reset () {
    collapse()
    chain().removeClass('selected')
    breadcrumb()

    // Upon reset ensure no value is returned to the calling code.
    settings.current(undefined)
  }

  /** Select item above current selection. */
  function moveU () {
    current().prev().click()
  }

  /** Select item below current selection. */
  function moveD () {
    current().next().click()
  }

  /** Select item left of the current selection. */
  function moveL () {
    var $ancestor = current().data('ancestor')

    if ($ancestor) {
      $ancestor.click()
    }
  }

  /** Select item right of the current selection, or down if no right item. */
  function moveR () {
    var $child = current().data('child')

    if ($child) {
      $child.children(itemSelector).first().click()
    } else {
      moveD()
    }
  }

  function keypress (event) {
    // Was an attempt made to move the currently selected item (the cursor)?
    var moved = false

    switch (event.which) {
      case 27:
        // escape
        reset()
        break
      case 38:
        // arrow up
        moveU()
        moved = true
        break
      case 40:
        // arrow down
        moveD()
        moved = true
        break
      case 37:
        // arrow left
        moveL()
        moved = true
        break
      case 39:
        // arrow right
        moveR()
        moved = true
        break
    }

    // If no item is selected, then jump to the first item.
    if (moved && (current().length === 0)) {
      $('.app-miller-column').first().children().first().click()
    }

    if (moved) {
      event.preventDefault()
    }
  }

  $.fn.millerColumns = function (options) {
    var defaults = {
      current: function ($item) {
        return undefined
      },
      breadcrumb: breadcrumb,
      animation: animation,
      delay: 500
    }

    settings = $.extend(defaults, options)

    return this.each(function () {
      var $columns = $(this)
      unnest($columns)
      collapse()

      // Expand the requested child node on click.
      $columns.find(itemSelector).on('click', function (event) {
        event.preventDefault()

        var that = this
        var $this = $(that)
        reset()

        var $child = $this.data('child')
        var $ancestor = $this

        if ($child) {
          $child.removeClass('collapse').children().removeClass('selected')
        }

        // Reveal (uncollapse) all ancestors to the clicked item.
        while ($ancestor) {
          $ancestor.addClass('selected').parent().removeClass('collapse')
          $ancestor = $ancestor.data('ancestor')
        }

        settings.animation.call(that, $columns, $this)
        settings.breadcrumb.call(that)
        settings.current.call(that, $this)

        // Don't allow the underlying element
        // to receive the click event.
        event.stopPropagation()
      })

      $columns.on('keydown', keypress)
      $columns.on('click', reset)
      // $('div.breadcrumb').on('click', moveL)

      // The last set of columns on the page recieves focus.
      // $columns.focus()
    })
  }
}(window.jQuery, window, document))

$('.app-miller-columns').millerColumns({
  current: function ($item) {
    // if ($item) $item.find('input').attr('checked', 'checked')
    // console.log( 'User selected:', $item )
  }
})
