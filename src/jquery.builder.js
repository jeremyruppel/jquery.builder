( function( $ )
{
  /**
   * jquery builder
   * --------------
   *
   * *AKA yet another jquery builder*
   * 
   * **jquery builder** is a builder plugin TODO WRITE MORE LATER I WANNA GO DRINK BEER
   */
  var Builder = function( scope, tags )
  {
    // The scope to start building on
    this.scope = scope;
    
    // The list of recognized tags
    this.tags = tags;
    
    // Create a method for each of the tags given
    $( tags ).each( $.proxy( function( index, tag )
    {
      this[ tag ] = function( value, options )
      {
        return this.build( tag, value, options, this.scope );
      };
    }, this ) );
    
    this.build = function( tag, value, options, scope )
    {
      // Append the tag
      scope.append( '<' + tag + '/>' );
      
      // Accept a couple types of values
      switch( typeof value )
      {
        // If it's a function, alter our scope and call it
        case 'function':

          this.scope = $( tag, scope );
        
          value.call( this, this );
          
          this.scope = scope;

          break;
        // If it's a string, add it as text to the node
        case 'string':
          
          $( tag, scope ).append( value );
          
          break;
        // If it's a hash, apply it as attributes to the node
        case 'object' :
        
          $( tag, scope ).attr( value );
        
          break;
      }
      
      // If the user wanted to pass text *and* an attribute hash, apply it now
      if( typeof options === 'object' )
      {
        $( tag, scope ).attr( options );
      }
      
      // Return self for chaining
      return this;
    };
    
    this.text = function( value )
    {
      $( this.scope ).append( value );
    };
  };
  
  // A list of default tags to support
  /*
    TODO need to make this list a little more legit. 
  */
  var defaults = 'h1 h2 h3 h4 h5 div input span a'.split( /\s+/ );
  
  var available = defaults.concat( );
  
  // jquery build plugin
  // -------------------
  $.fn.build = function( value )
  {
    // Create our builder instance
    var builder = new Builder( this, available );
    
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
        
        available.push( $.trim( value ) );
      
        break;
      
      case 'boolean' :
      
        if( value === false )
        {
          available = defaults.concat( );
        }
    }
    // Return jquery for chaining
    return this;
  };
// Maybe we'll even try this with zepto sometime, who knows?
} )( jQuery );