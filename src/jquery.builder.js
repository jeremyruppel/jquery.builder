/**
 * jquery builder
 * --------------
 *
 * *AKA yet another jquery builder*
 * 
 * **jquery builder** is a jquery plugin for building XML or HTML dynamically.
 * I couldn't find a builder plugin with the syntax I wanted out there, so here's my version.
 * See [the project's github page](https://github.com/jeremyruppel/jquery.builder) for more information.
 *
 * **Contributors:**
 *
 * - [Jeremy Ruppel](https://github.com/jeremyruppel) *Author*
 *
 * - [Paulo Gabriel Poiati](https://github.com/poiati)
 */
( function( $ )
{
  var _builder = function( scope, tags )
  {
    var _that = function ( expression, value, options ) 
    { 
      _that.build( expression, value, options, _that.scope );
    };
    
    // The scope to start building on
    _that.scope = scope;
    
    // The list of recognized tags
    _that.tags = tags;
    
    // Create a method for each of the tags given
    $( tags ).each( $.proxy( function( index, tag )
    {
      this[ tag ] = function( value, options )
      {
        return this.build( tag, value, options, this.scope );
      };
    }, null, _that ) );
    
    _that.build = function( expression, value, options, scope )
    {
      
      // Create reference to the new tag
      var tagReference = _createTagReference( expression );
      
      _that.scope.append( tagReference.root )
      
      // Accept a couple types of values
      switch( typeof value )
      {
        // If it's a function, alter our scope and call it
        case 'function':
        
          _that.scope = tagReference.innermost;
          
          value.call( _that, _that );
          
          _that.scope = scope;
          
          break;
        // If it's a string or number, add it as text to the node
        case 'string':
        case 'number':
          
          tagReference.innermost.append( value );
          
          break;
        // If it's a hash, apply it as attributes to the node
        case 'object' :
        
          tagReference.innermost.attr( value );
        
          break;
      }
      
      // If the user wanted to pass text *and* an attribute hash, apply it now
      if( typeof options === 'object' )
      {
        tagReference.innermost.attr( options );
      }
      
      // Return self for chaining
      return _that;
    };
    
    // Check if this is a complex ( more than one tag ) or simple expression and if is
    // complex return the outermost and innermost element
    function _createTagReference( expression )
    {
      var expr = _expression( expression );
      var root = null, innermost = null;
      
      if ( !expr.isComplex( ) )
      {
        innermost = root = $( '<' + expression + '/>' );
        return { root: root, innermost: innermost }
      }

      expr.eachTag( function( tag )
      {
        if ( !innermost )
        {
          innermost = root = $( '<' + tag + '/>' );
        }          
        else
        {
          innermost = $( '<' + tag + '/>' ).appendTo( innermost );
        }
      } );

      return { root: root, innermost: innermost };
    }
    
    _that.text = function( value )
    {
      $( _that.scope ).append( value );
    };
    
    return _that;
  };
  
  var _expression = function( value )
  {
    var _that = { },
        _tags = [ ]
    
    function _parse( value ) 
    {
      if ( !value ) 
        throw new Error('Invalid expression: empty or null');
      _tags = value.split(/\s+/);
    }
    
    function _isComplex( ) 
    {
      return _tags.length > 1;
    }
    
    function _eachTag( fn )
    {
      return $( _tags ).each( function( ) { fn.call( null, String( this ) ) } );
    }
    
    _parse( value )
    
    _that.isComplex = _isComplex;
    _that.eachTag   = _eachTag;
    
    return _that
  }
  
  // A list of default tags to support
  /*
    TODO need to make this list a little more legit. 
  */
  var defaults = 'h1 h2 h3 h4 h5 div input span a ul li table tbody thead th tr td'.split( /\s+/ );
  
  // A full list of the tags to support, including custom ones
  var available = defaults.concat( );
  
  // jquery build plugin
  // -------------------
  $.fn.build = function( value )
  {
    // Create our builder instance
    var builder = _builder( this, available );
    
    // Accept a couple types of values here, too
    switch( typeof value )
    {
      // If it's a function, start building!
      case 'function':
        value.call( builder, builder );
        
        break;
      // If it's a string, add it to our custom tags list
      case 'string':
        
        if( builder.hasOwnProperty( value ) )
        {
          throw "jquery.builder: cannot add method '" + value + "' to builder because it is already defined";
        }
        
        available.push( value );
      
        break;
      
      // If it's a boolean and it's false, reset the tags list
      case 'boolean' :
      
        if( value === false )
        {
          available = defaults.concat( );
        }
    }
    // Return jquery for chaining
    return this;
  };
} )( jQuery );